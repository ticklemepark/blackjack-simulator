import {rankedConfig} from './ranked-config.js?v=20260916-google-1';
export const configured=Boolean(rankedConfig.url&&rankedConfig.publishableKey);
let client;
export async function authClient(){
 if(!configured)throw Error('Ranked play is not connected yet. Practice is available.');
 if(!client){const {createClient}=await import('https://esm.sh/@supabase/supabase-js@2.116.0');client=createClient(rankedConfig.url,rankedConfig.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});}
 return client;
}
export async function signedIn(){const c=await authClient();const {data,error}=await c.auth.getSession();if(error)throw error;return data.session;}
export async function googleSignIn(){const c=await authClient();const {error}=await c.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+location.pathname}});if(error)throw error;}
export async function signOut(){const c=await authClient();const {error}=await c.auth.signOut();if(error)throw error;}
export async function rankedRequest(body){
 if(!configured)throw Error('Ranked play is not connected yet. Practice is available.');
 let session=null;if(body.operation!=='leaderboard')session=await signedIn();
 const res=await fetch(rankedConfig.url+'/functions/v1/blackjack',{method:'POST',headers:{'Content-Type':'application/json',apikey:rankedConfig.publishableKey,...(session?{Authorization:'Bearer '+session.access_token}:{})},body:JSON.stringify(body)});
 const result=await res.json();if(!res.ok)throw Error(result.error||'Unable to reach the ranked table.');return result;
}
