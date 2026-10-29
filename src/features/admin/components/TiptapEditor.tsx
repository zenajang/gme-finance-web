'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import Youtube from '@tiptap/extension-youtube';
import { FontSize } from './FontSizeExtension';
import { Video } from './VideoExtension';
import { createClient } from '@/lib/supabase/client';
import { useRef, useState, useEffect } from 'react';
import './TiptapEditor.css';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

// Custom type for editor with FontSize extension
interface ExtendedEditor extends Editor {
  chain: () => {
    focus: () => {
      setFontSize: (size: string) => {
        run: () => boolean;
      };
    };
  } & ReturnType<Editor['chain']>;
}

export default function TiptapEditor({ content, onChange, placeholder = 'Please enter the content...' }: TiptapEditorProps) {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        hardBreak: {
          keepMarks: true,
        },
      }),
      TextStyle,
      FontSize,
      Color.configure({
        types: ['textStyle'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Image,
      Video,
      Youtube.configure({
        controls: true,
        nocookie: true,
        modestBranding: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Underline,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    immediatelyRender: false, // SSR 에러 해결
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // content prop이 외부에서 변경될 때 에디터 내용 업데이트
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('you can only upload image files (jpg, png, gif, webp).');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('The image size should not exceed 5MB.');
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      const { error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '31536000',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        alert('Upload error :' + error.message);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      if (publicUrl) {
        editor.chain().focus().setImage({ src: publicUrl }).run();
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('An error occurred during image upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
    // 같은 파일 재업로드를 위해 input 값 초기화
    e.target.value = '';
  };

  const uploadVideo = async (file: File) => {
    setUploadingVideo(true);
    try {
      const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'];
      if (!validTypes.includes(file.type)) {
        alert('지원되는 동영상 형식: MP4, WebM, OGG, MOV, AVI, MKV');
        return;
      }

      // 50MB 제한
      if (file.size > 50 * 1024 * 1024) {
        alert('동영상 파일 크기는 50MB를 초과할 수 없습니다.');
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `blog-videos/${fileName}`;

      const { error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '31536000',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        alert('업로드 오류: ' + error.message);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      if (publicUrl) {
        editor.chain().focus().setVideo({ src: publicUrl }).run();
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('동영상 업로드 중 오류가 발생했습니다.');
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleVideoUpload = () => {
    videoInputRef.current?.click();
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadVideo(file);
    }
    e.target.value = '';
  };

  const addYoutubeVideo = () => {
    const url = window.prompt('YouTube URL을 입력하세요:');

    if (url) {
      // YouTube URL 검증
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|shorts\/)|youtu\.be\/)/;
      if (!youtubeRegex.test(url)) {
        alert('올바른 YouTube URL을 입력해주세요.');
        return;
      }
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 360,
      });
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt("Enter link URL : ", previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* 사용 안내 */}
      <div className="bg-blue-50 border-b border-blue-200 px-3 py-2 text-xs text-blue-700">
        💡 <strong>Inline styles</strong>: B, I, U, S, Size, Color | <strong>Block styles</strong>: H1-H3, P, Align | <strong>Enter</strong>: new line | <strong>Shift+Enter</strong>: break
      </div>

      {/* 툴바 */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        
        {/* 실행 취소/재실행 */}
        <div className="flex gap-1 border-r pr-1">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
            title="undo"
          >
          ↶
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
            title="redo"
          >
            ↷
          </button>
        </div>
        {/* 텍스트 스타일 */}
        <div className="flex gap-1 border-r pr-1">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`px-3 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('bold') ? 'bg-gray-300' : ''
            }`}
            title="bold"
          >
            <strong>B</strong>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`px-3 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('italic') ? 'bg-gray-300' : ''
            }`}
            title="italic"
          >
            <em>I</em>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={`px-3 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('underline') ? 'bg-gray-300' : ''
            }`}
            title="underline"
          >
            <u>U</u>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`px-3 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('strike') ? 'bg-gray-300' : ''
            }`}
            title="strike"
          >
            <s>S</s>
          </button>
        </div>

        {/* 텍스트 크기 (인라인) */}
        <div className="flex gap-1 border-r pr-1">
          <button
            onClick={() => (editor as ExtendedEditor).chain().focus().setFontSize('0.875em').run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors text-xs"
            title="small text (choice only)"
          >
            A
          </button>
          <button
            onClick={() => (editor as ExtendedEditor).chain().focus().setFontSize('1em').run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors text-sm"
            title="normal text (choice only)"
          >
            A
          </button>
          <button
            onClick={() => (editor as ExtendedEditor).chain().focus().setFontSize('1.25em').run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors text-base"
            title="large text (choice only)"
          >
            A
          </button>
          <button
            onClick={() => (editor as ExtendedEditor).chain().focus().setFontSize('1.5em').run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors text-lg"
            title="larger text (choice only)"
          >
            A
          </button>
          <button
            onClick={() => (editor as ExtendedEditor).chain().focus().setFontSize('2em').run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors text-xl"
            title="largest text (choice only)"
          >
            A
          </button>
        </div>
        {/* 텍스트 색상 */}
        <div className="flex gap-1 border-r pr-1">
          <button
            onClick={() => editor.chain().focus().setColor('#000000').run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors"
            title="black color"
          >
            <span style={{ color: '#000000' }}>●</span>
          </button>
          <button
            onClick={() => editor.chain().focus().setColor('#dc2626').run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors"
            title="red color"
          >
            <span style={{ color: '#dc2626' }}>●</span>
          </button>
          <button
            onClick={() => editor.chain().focus().setColor('#2563eb').run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors"
            title="blue color"
          >
            <span style={{ color: '#2563eb' }}>●</span>
          </button>
          <button
            onClick={() => editor.chain().focus().setColor('#16a34a').run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors"
            title="green color"
          >
            <span style={{ color: '#16a34a' }}>●</span>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors"
            title="highlight yellow"
          >
            <span style={{ backgroundColor: '#fef08a', padding: '0 2px' }}>H</span>
          </button>
        </div>

        <div className="flex gap-1 border-r pr-1">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('heading', { level: 1 }) ? 'bg-gray-300' : ''
            }`}
            title="title 1 (whole paragraph)"
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''
            }`}
            title="title 2 (whole paragraph)"
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('heading', { level: 3 }) ? 'bg-gray-300' : ''
            }`}
            title="title 3 (whole paragraph)"
          >
            H3
          </button>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('paragraph') ? 'bg-gray-300' : ''
            }`}
            title="paragraph (whole paragraph)"
          >
            P
          </button>
        </div>

        {/* 목록 */}
        <div className="flex gap-1 border-r pr-1">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-3 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('bulletList') ? 'bg-gray-300' : ''
            }`}
            title="pullet list"
          >
            •
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-3 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('orderedList') ? 'bg-gray-300' : ''
            }`}
            title="numbered list"
          >
            1.
          </button>
        </div>

        {/* 정렬 */}
        <div className="flex gap-1 border-r pr-1">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300' : ''
            }`}
            title="left align"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#8d8d8dff" strokeWidth="1.5">
            <line x1="2" y1="6" x2="21" y2="6"/>
            <line x1="2" y1="12" x2="15" y2="12"/>
            <line x1="2" y1="18" x2="21" y2="18"/>
          </svg>

          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300' : ''
            }`}
            title="center align"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#8d8d8dff" strokeWidth="1.5">
            <line x1="6" y1="6" x2="18" y2="6"/>
            <line x1="1" y1="12" x2="23" y2="12"/>
            <line x1="6" y1="18" x2="18" y2="18"/>
          </svg>

          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300' : ''
            }`}
            title="right align"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#8d8d8dff" strokeWidth="1.5">
            <line x1="2" y1="6" x2="21" y2="6"/>
            <line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="2" y1="18" x2="21" y2="18"/>
          </svg>

          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-300' : ''
            }`}
            title="justify align"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#8d8d8dff" strokeWidth="1.5">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
          </button>
        </div>

        {/* 링크 & 이미지 */}
        <div className="flex gap-1 border-r pr-1">
          <button
            onClick={setLink}
            className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('link') ? 'bg-gray-300' : ''
            }`}
            title="Link"
          >
            🔗
          </button>
          <button
            onClick={handleImageUpload}
            disabled={uploading}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
            title={uploading ? 'Uploading...' : 'Upload image'}
          >
            {uploading ? '⏳' : '🖼️'}
          </button>
        </div>

        {/* 동영상 */}
        <div className="flex gap-1">
          <button
            onClick={addYoutubeVideo}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors"
            title="YouTube 영상 추가"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FF0000">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </button>
          <button
            onClick={handleVideoUpload}
            disabled={uploadingVideo}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
            title={uploadingVideo ? '업로드 중...' : '동영상 업로드'}
          >
            {uploadingVideo ? '⏳' : '🎬'}
          </button>
        </div>
      </div>

      {/* 에디터 컨텐츠 */}
      <div
        className="p-4 min-h-[400px] focus-within:outline-none"
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();

          const files = Array.from(e.dataTransfer.files);
          const imageFile = files.find(file => file.type.startsWith('image/'));

          if (imageFile) {
            uploadImage(imageFile);
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <EditorContent
          editor={editor}
          className="tiptap-editor prose prose-sm max-w-none focus:outline-none [&_.ProseMirror]:min-h-[350px] [&_.ProseMirror]:focus:outline-none"
        />
      </div>

      {/* Hidden file input for image upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/gif,image/webp"
        style={{ display: 'none' }}
      />

      {/* Hidden file input for video upload */}
      <input
        type="file"
        ref={videoInputRef}
        onChange={handleVideoChange}
        accept="video/mp4,video/webm,video/ogg,video/quicktime,video/x-msvideo,video/x-matroska"
        style={{ display: 'none' }}
      />
    </div>
  );
}
