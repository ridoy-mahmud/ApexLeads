import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');
    
    // In real app, filter down by user's organization
    
    let whereCondition = {};
    if (projectId) {
      whereCondition = { projectId };
    }
    
    const leads = await prisma.lead.findMany({
      where: whereCondition,
      include: {
        contacts: true
      },
      orderBy: { createdAt: 'desc' },
      take: 100 // pagination not implemented yet
    });

    return NextResponse.json({ success: true, data: leads });

  } catch (error) {
    console.error('Leads Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { companyName, projectId, domain, industry, location } = body;
    
    let pid = projectId;
    if (!pid) {
      const org = await prisma.organization.findFirst() || await prisma.organization.create({
        data: { name: 'Default Org' }
      });
      const proj = await prisma.project.findFirst() || await prisma.project.create({
        data: { name: 'Default Project', organizationId: org.id }
      });
      pid = proj.id;
    }

    const lead = await prisma.lead.create({
      data: {
        companyName,
        projectId: pid,
        domain,
        industry,
        location,
        icpScore: Math.random() // Placeholder for actual scoring
      }
    });

    return NextResponse.json({ success: true, data: lead });

  } catch (error) {
    console.error('Leads Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
