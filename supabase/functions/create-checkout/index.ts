import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
const cors={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, apikey, content-type","Access-Control-Allow-Methods":"POST, OPTIONS"};
serve(async req=>{if(req.method==="OPTIONS")return new Response("ok",{headers:cors});try{
const auth=req.headers.get("Authorization");if(!auth)throw new Error("Login required");
const anon=createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_ANON_KEY")!,{global:{headers:{Authorization:auth}}});
const {data:{user},error:authError}=await anon.auth.getUser();if(authError||!user)throw new Error("Invalid session");
const body=await req.json();if(!Array.isArray(body.items)||!body.items.length||body.items.length>30)throw new Error("Invalid cart");
const customer=body.customer;if(!customer||!customer.name||!customer.email||!customer.address||!customer.city||!customer.country)throw new Error("Shipping details required");
const admin=createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const ids=body.items.map((i:any)=>i.product_id);const {data:products,error}=await admin.from("products").select("id,name,price_cents,stock,sizes,active").in("id",ids);if(error)throw error;
const byId=new Map(products.map((p:any)=>[p.id,p]));let total=0;const lines=[];
for(const item of body.items){const p=byId.get(item.product_id);if(!p||!p.active)throw new Error("Product not available");if(!p.sizes.includes(item.size))throw new Error("Invalid size");if(!Number.isInteger(item.quantity)||item.quantity<1||item.quantity>p.stock)throw new Error("Quantity not available");total+=p.price_cents*item.quantity;lines.push({price_data:{currency:"usd",product_data:{name:p.name+" / "+item.size},unit_amount:p.price_cents},quantity:item.quantity});}
const {data:order,error:orderError}=await admin.from("orders").insert({user_id:user.id,status:"pending",currency:"usd",subtotal_cents:total,shipping_cents:0,total_cents:total,customer_name:customer.name,customer_email:customer.email,shipping_address:customer,payment_provider:"stripe"}).select("id").single();if(orderError)throw orderError;
const stripe=new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!,{apiVersion:"2024-06-20"});
const session=await stripe.checkout.sessions.create({mode:"payment",customer_email:customer.email,line_items:lines,metadata:{order_id:order.id,user_id:user.id},success_url:Deno.env.get("SITE_URL")+"/?payment=success",cancel_url:Deno.env.get("SITE_URL")+"/?payment=cancel"});
const {error:itemsError}=await admin.from("order_items").insert(body.items.map((item:any)=>{const p=byId.get(item.product_id);return {order_id:order.id,product_id:p.id,product_name:p.name,size:item.size,quantity:item.quantity,unit_price_cents:p.price_cents};}));if(itemsError)throw itemsError;
await admin.from("orders").update({payment_session_id:session.id}).eq("id",order.id);
return new Response(JSON.stringify({url:session.url}),{headers:{...cors,"Content-Type":"application/json"}});
}catch(e){return new Response(JSON.stringify({error:e.message||"Checkout error"}),{status:400,headers:{...cors,"Content-Type":"application/json"}})}});
