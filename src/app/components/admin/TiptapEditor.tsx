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
import { FontSize } from './FontSizeExtension';
import { createClient } from '@/lib/supabase/client';
import { useRef, useState } from 'react';
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

export default function TiptapEditor({ content, onChange, placeholder = '내용을 입력하세요...' }: TiptapEditorProps) {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

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

  if (!editor) return null;

  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      // 파일 유효성 검사
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('이미지 파일만 업로드 가능합니다. (JPG, PNG, GIF, WEBP)');
        return;
      }

      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      // 고유한 파일명 생성
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      // Supabase Storage에 업로드
      const { error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        alert('이미지 업로드 실패: ' + error.message);
        return;
      }

      // 업로드된 이미지의 공개 URL 가져오기
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      // 에디터에 이미지 삽입
      if (publicUrl) {
        editor.chain().focus().setImage({ src: publicUrl }).run();
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('이미지 업로드 중 오류가 발생했습니다.');
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

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('링크 URL을 입력하세요:', previousUrl);

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
            title="실행 취소"
          >
          ↶
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
            title="재실행"
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
            title="굵게"
          >
            <strong>B</strong>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`px-3 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('italic') ? 'bg-gray-300' : ''
            }`}
            title="기울임"
          >
            <em>I</em>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={`px-3 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('underline') ? 'bg-gray-300' : ''
            }`}
            title="밑줄"
          >
            <u>U</u>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`px-3 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('strike') ? 'bg-gray-300' : ''
            }`}
            title="취소선"
          >
            <s>S</s>
          </button>
        </div>

        {/* 텍스트 크기 (인라인) */}
        <div className="flex gap-1 border-r pr-1">
          <button
            onClick={() => (editor as ExtendedEditor).chain().focus().setFontSize('0.875em').run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors text-xs"
            title="작은 텍스트 (선택한 부분만)"
          >
            A
          </button>
          <button
            onClick={() => (editor as ExtendedEditor).chain().focus().setFontSize('1em').run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors text-sm"
            title="보통 텍스트 (선택한 부분만)"
          >
            A
          </button>
          <button
            onClick={() => (editor as ExtendedEditor).chain().focus().setFontSize('1.25em').run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors text-base"
            title="큰 텍스트 (선택한 부분만)"
          >
            A
          </button>
          <button
            onClick={() => (editor as ExtendedEditor).chain().focus().setFontSize('1.5em').run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors text-lg"
            title="더 큰 텍스트 (선택한 부분만)"
          >
            A
          </button>
          <button
            onClick={() => (editor as ExtendedEditor).chain().focus().setFontSize('2em').run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors text-xl"
            title="아주 큰 텍스트 (선택한 부분만)"
          >
            A
          </button>
        </div>
        {/* 텍스트 색상 */}
        <div className="flex gap-1 border-r pr-1">
          <button
            onClick={() => editor.chain().focus().setColor('#000000').run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors"
            title="검정색"
          >
            <span style={{ color: '#000000' }}>●</span>
          </button>
          <button
            onClick={() => editor.chain().focus().setColor('#dc2626').run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors"
            title="빨간색"
          >
            <span style={{ color: '#dc2626' }}>●</span>
          </button>
          <button
            onClick={() => editor.chain().focus().setColor('#2563eb').run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors"
            title="파란색"
          >
            <span style={{ color: '#2563eb' }}>●</span>
          </button>
          <button
            onClick={() => editor.chain().focus().setColor('#16a34a').run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors"
            title="초록색"
          >
            <span style={{ color: '#16a34a' }}>●</span>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors"
            title="형광펜"
          >
            <span style={{ backgroundColor: '#fef08a', padding: '0 2px' }}>H</span>
          </button>
        </div>

        {/* 제목 (단락 전체) */}
        <div className="flex gap-1 border-r pr-1">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('heading', { level: 1 }) ? 'bg-gray-300' : ''
            }`}
            title="제목 1 (단락 전체)"
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''
            }`}
            title="제목 2 (단락 전체)"
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('heading', { level: 3 }) ? 'bg-gray-300' : ''
            }`}
            title="제목 3 (단락 전체)"
          >
            H3
          </button>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('paragraph') ? 'bg-gray-300' : ''
            }`}
            title="일반 텍스트"
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
            title="글머리 기호 목록"
          >
            •
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-3 py-1 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('orderedList') ? 'bg-gray-300' : ''
            }`}
            title="번호 목록"
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
            title="왼쪽 정렬"
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
            title="가운데 정렬"
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
            title="오른쪽 정렬"
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
            title="양쪽 정렬"
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
            title="링크"
          >
            🔗
          </button>
          <button
            onClick={handleImageUpload}
            disabled={uploading}
            className="px-2 py-1 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
            title={uploading ? '업로드 중...' : '이미지 업로드'}
          >
            {uploading ? '⏳' : '🖼️'}
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
    </div>
  );
}