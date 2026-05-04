// scripts/upload-fleet-images.mjs
import { createClient } from '@supabase/supabase-js'
import { readdir, readFile } from 'fs/promises'
import { join, extname } from 'path'

const supabase = createClient(
  'https://prlwwmtibaszzyvmciyu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBybHd3bXRpYmFzenp5dm1jaXl1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzEzMTcxMCwiZXhwIjoyMDkyNzA3NzEwfQ.psbxnnGgLZQacYm6CxYyyyxOsFQ_Ac95ghNgpghhlzk'  // use service role key, not anon key
)

const IMAGES_DIR = './public/images/vehicles'
const BUCKET     = 'fleet-images'
const FOLDER     = 'vehicles'

const ACCEPTED = ['.webp', '.jpg', '.jpeg', '.png']

async function uploadAll() {
  const files = await readdir(IMAGES_DIR)
  const images = files.filter((f) => ACCEPTED.includes(extname(f).toLowerCase()))

  console.log(`Found ${images.length} images to upload...`)

  let success = 0, failed = 0

  for (const filename of images) {
    const filePath = join(IMAGES_DIR, filename)
    const buffer   = await readFile(filePath)
    const ext      = extname(filename).slice(1)
    const mimeType = ext === 'webp' ? 'image/webp' : ext === 'png' ? 'image/png' : 'image/jpeg'

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(`${FOLDER}/${filename}`, buffer, {
        contentType:  mimeType,
        cacheControl: '31536000',
        upsert:       true,  // overwrite if exists
      })

    if (error) {
      console.error(`✗ ${filename}: ${error.message}`)
      failed++
    } else {
      console.log(`✓ ${filename}`)
      success++
    }
  }

  console.log(`\nDone: ${success} uploaded, ${failed} failed`)
  console.log(`\nBase URL:`)
  console.log(`https://prlwwmtibaszzyvmciyu.supabase.co/storage/v1/object/public/fleet-images/vehicles/`)
}

uploadAll()