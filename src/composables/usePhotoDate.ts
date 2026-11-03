import * as exifr from 'exifr'

export async function getPhotoDate(file: File): Promise<string | null> {
    try {
        const exif = await exifr.parse(file, ['DateTimeOriginal'])
        const date = exif?.DateTimeOriginal

        if (date instanceof Date && !Number.isNaN(date.getTime())) {
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')

            return `${year}-${month}-${day}`
        }
    } catch {
    }

    return null
}