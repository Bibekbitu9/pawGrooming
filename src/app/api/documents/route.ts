import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/documents
 * Upload a document (vaccination certificate or BBMP registration)
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;
    const petId = formData.get('petId') as string;

    if (!file || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: file, type' },
        { status: 400 }
      );
    }

    // TODO: Upload to Supabase Storage
    // const { data, error } = await supabase.storage.from('documents').upload(path, file);

    // TODO: Run AWS Textract for extraction
    // const buffer = Buffer.from(await file.arrayBuffer());
    // const { extractRabiesVaccineDate, extractBBMPRegistration } = await import('@/lib/textract');
    // const result = type === 'vaccination'
    //   ? await extractRabiesVaccineDate(buffer)
    //   : await extractBBMPRegistration(buffer);

    const document = {
      id: `doc_${Date.now()}`,
      type,
      petId,
      fileName: file.name,
      fileSize: file.size,
      status: 'processing',
      uploadedAt: new Date().toISOString(),
    };

    console.log('[Documents API] Uploaded document:', document);

    return NextResponse.json({
      document,
      message: 'Document uploaded, extraction in progress',
    });
  } catch (error) {
    console.error('[Documents API] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET /api/documents
 * List documents (stub)
 */
export async function GET() {
  // TODO: Fetch from database
  return NextResponse.json({
    documents: [],
    message: 'No documents found (stub)',
  });
}
