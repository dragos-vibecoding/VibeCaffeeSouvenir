import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// PATCH /api/rezervari — schimba statusul unei rezervari
// Body: { id: number, status: 'IN ASTEPTARE' | 'CONFIRMAT' | 'RESPINS' }
export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();

  if (!id || !status) {
    return NextResponse.json({ error: 'id si status sunt obligatorii' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('rezervari')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// DELETE /api/rezervari — sterge o rezervare
// Body: { id: number }
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'id este obligatoriu' }, { status: 400 });
  }

  const { error } = await supabase
    .from('rezervari')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// GET /api/rezervari — returneaza toate rezervarile, ordonate dupa data
export async function GET() {
  const { data, error } = await supabase
    .from('rezervari')
    .select('*')
    .order('data_rezervare', { ascending: true })
    .order('ora_rezervare', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
