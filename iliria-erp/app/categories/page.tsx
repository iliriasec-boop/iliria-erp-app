'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Category = { id:number; code:number; name:string; description:string }

export default function CategoriesPage(){
  const [rows,setRows]=useState<Category[]>([])
  const [code,setCode]=useState('')
  const [name,setName]=useState('')
  const [description,setDescription]=useState('')

  const load = async()=>{
    const { data, error } = await supabase.from('core.categories').select('*').order('code')
    if(!error) setRows(data as any || [])
  }

  useEffect(()=>{ load() },[])

  const add = async()=>{
    if(!code || !name) return alert('Βάλε code και όνομα')
    const { error } = await supabase.from('core.categories').insert({code:Number(code), name, description})
    if(error) return alert(error.message)
    setCode(''); setName(''); setDescription(''); load()
  }

  return (
    <main style={{padding:24}}>
      <h1>Κατηγορίες</h1>

      <div style={{display:'grid', gridTemplateColumns:'120px 1fr 1fr 120px', gap:8, alignItems:'end', maxWidth:900}}>
        <div>
          <label>Κωδικός (01..99)</label>
          <input value={code} onChange={e=>setCode(e.target.value)} placeholder="01" style={{width:'100%', padding:8, border:'1px solid #ccc'}} />
        </div>
        <div>
          <label>Όνομα</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Κάμερες Αναλογικές" style={{width:'100%', padding:8, border:'1px solid #ccc'}} />
        </div>
        <div>
          <label>Περιγραφή</label>
          <input value={description} onChange={e=>setDescription(e.target.value)} style={{width:'100%', padding:8, border:'1px solid #ccc'}} />
        </div>
        <button onClick={add} style={{padding:10}}>Προσθήκη</button>
      </div>

      <table style={{marginTop:24, width:'100%', maxWidth:900, borderCollapse:'collapse'}}>
        <thead>
          <tr style={{textAlign:'left', borderBottom:'1px solid #ddd'}}>
            <th style={{padding:8}}>Code</th>
            <th style={{padding:8}}>Όνομα</th>
            <th style={{padding:8}}>Περιγραφή</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.id} style={{borderTop:'1px solid #eee'}}>
              <td style={{padding:8}}>{String(r.code).padStart(2,'0')}</td>
              <td style={{padding:8}}>{r.name}</td>
              <td style={{padding:8}}>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
