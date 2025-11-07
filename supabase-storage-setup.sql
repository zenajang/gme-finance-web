-- Supabase Storage Setup for Blog Images
-- Run this in your Supabase SQL Editor

-- Create the storage bucket for images if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'images',
    'images',
    true,  -- Make bucket public so images can be viewed
    5242880,  -- 5MB max file size
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']::text[]
) ON CONFLICT (id) DO UPDATE
SET
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']::text[];

-- Set up RLS policies for the images bucket
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated users to upload images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public to view images" ON storage.objects;

-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload images" ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images');

-- Allow authenticated users to update their own images
CREATE POLICY "Allow authenticated users to update images" ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'images')
WITH CHECK (bucket_id = 'images');

-- Allow authenticated users to delete their own images
CREATE POLICY "Allow authenticated users to delete images" ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'images');

-- Allow public to view images (since bucket is public)
CREATE POLICY "Allow public to view images" ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'images');

-- Note: After running this SQL, you may also need to:
-- 1. Go to your Supabase Dashboard > Storage
-- 2. Verify the 'images' bucket exists and is public
-- 3. Test uploading an image through the admin panel