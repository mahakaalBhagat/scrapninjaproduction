import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOGS } from '../data';

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return BLOGS.map((blog) => ({
    slug: blog.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPageProps) {
  const blog = BLOGS.find((item) => item.slug === params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-50 py-8 md:py-12">
      <div className="container-responsive">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600">
              {blog.category}
            </p>
            <h1 className="heading-1 mt-2">{blog.title}</h1>
            <p className="mt-3 max-w-2xl text-neutral-600 body-sm">{blog.excerpt}</p>
          </div>
          <Link href="/blogs" className="btn-ghost btn-sm w-fit">
            Back to Blog
          </Link>
        </div>

        <div className="space-y-6 rounded-3xl bg-white p-8 shadow-card">
          {blog.content.map((paragraph, index) => (
            <p key={index} className="text-neutral-700 leading-8">
              {paragraph}
            </p>
          ))}
          <div className="mt-8 text-sm text-neutral-500">{blog.readTime}</div>
        </div>
      </div>
    </main>
  );
}
