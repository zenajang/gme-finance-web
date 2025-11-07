-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  author_email VARCHAR(255),
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts (published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON blog_posts (author_id);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Policy: Anyone can view published posts
CREATE POLICY "Anyone can view published posts" ON blog_posts
  FOR SELECT USING (published = true);

-- Policy: Authenticated users can view all posts
CREATE POLICY "Authenticated users can view all posts" ON blog_posts
  FOR SELECT TO authenticated
  USING (true);

-- Policy: Authenticated users can insert posts
CREATE POLICY "Authenticated users can insert posts" ON blog_posts
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- Policy: Authors can update their own posts
CREATE POLICY "Authors can update their own posts" ON blog_posts
  FOR UPDATE TO authenticated
  USING (auth.uid() = author_id);

-- Policy: Authors can delete their own posts
CREATE POLICY "Authors can delete their own posts" ON blog_posts
  FOR DELETE TO authenticated
  USING (auth.uid() = author_id);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();