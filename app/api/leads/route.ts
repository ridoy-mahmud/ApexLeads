import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');
    
    let leads;
    
    if (projectId) {
      leads = await prisma.lead.findMany({
        where: { projectId },
        orderBy: { score: 'desc' }
      });
    } else {
      leads = await prisma.lead.findMany({
        orderBy: { score: 'desc' },
        take: 50 // Limit to top 50 in default view
      });
    }

    return NextResponse.json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
