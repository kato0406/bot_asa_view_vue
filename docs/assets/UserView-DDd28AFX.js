import{r as o,d as f,a as k,b as g,o as l,c as v,e as a,w as _,j as V,F as Y,h,t as x,v as w,f as b,g as C,i as B,_ as N}from"./index-D8piVz_j.js";import{_ as U}from"./LineChart-BoV_Xzog.js";const j={class:"row mb-3"},L={class:"col-4"},S={class:"col-4"},E={class:"col-4"},F={key:0,class:"figure w-100"},$={__name:"UserView",setup(T){const D=["担当チケット","今週期限","処理済み","期限切れ","期限日変更","追加","消化"],p=o([]),n=o(),r=o(f().lastMonday().subtract(4,"week").format("YYYY-MM-DD")),u=o(f().lastMonday().format("YYYY-MM-DD")),c=o({}),d=async()=>{const s=await g.get("",{params:{route:"issue_count_logs.user",from_date:r.value,to_date:u.value}}),e=[],t=[],y=s.data.issue_count_logs.filter(m=>m.user_name===n.value);D.forEach(m=>{t.push({label:m,data:N.map(y,M(m))})});let i=r.value;for(;i!==f(u.value).add(1,"week").format("YYYY-MM-DD");)e.push(i),i=f(i).add(1,"week").format("YYYY-MM-DD");c.value={labels:e,datasets:t}},M=s=>{switch(s){case"担当チケット":return"assign_count";case"今週期限":return"due_week_count";case"処理済み":return"resolve_count";case"期限切れ":return"expire_count";case"期限日変更":return"change_count";case"追加":return"add_count";case"消化":return"close_count"}};return k(async()=>{const s=await g.get("",{params:{route:"users"}}).catch(e=>console.log(e));p.value=s.data.users,n.value=p.value[0].name,await d()}),(s,e)=>(l(),v(Y,null,[a("div",j,[a("div",L,[e[3]||(e[3]=a("label",{for:"date",class:"form-label"},"担当者",-1)),_(a("select",{onChange:d,class:"form-control","onUpdate:modelValue":e[0]||(e[0]=t=>n.value=t)},[(l(!0),v(Y,null,h(p.value,t=>(l(),v("option",{key:t.id},x(t.name),1))),128))],544),[[V,n.value]])]),a("div",S,[e[4]||(e[4]=a("label",{for:"date",class:"form-label"},"日付",-1)),_(a("input",{onChange:d,id:"date",type:"date",class:"form-control","onUpdate:modelValue":e[1]||(e[1]=t=>r.value=t)},null,544),[[w,r.value]])]),a("div",E,[e[5]||(e[5]=a("label",{for:"date",class:"form-label"},"日付",-1)),_(a("input",{onChange:d,id:"date",type:"date",class:"form-control","onUpdate:modelValue":e[2]||(e[2]=t=>u.value=t)},null,544),[[w,u.value]])])]),Object.keys(c.value).length!==0?(l(),v("figure",F,[e[6]||(e[6]=a("figcaption",{class:"figure-caption fs-6"},[b(" チケット件数の推移を確認し、件数が高いまま変わっていなかったり、上昇傾向にある場合は指摘する"),a("br"),b(" ※チャートの上の項目を押すと対象のデータを非表示に出来ます ")],-1)),(l(),C(U,{key:c.value,data:c.value},null,8,["data"]))])):B("",!0)],64))}};export{$ as default};
