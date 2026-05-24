import React from 'react';
import Link from 'next/link';

const BLOGS = [
  {
    title: 'How ScrapNinja Makes Scrap Collection Faster in Dubai',
    excerpt:
      'A quick look at how our pickup flow, verified collectors, and live tracking simplify scrap collection for households and businesses.',
    category: 'Product',
    readTime: '4 min read',
  },
  {
    title: 'Why Proper Scrap Segregation Improves Recycling Value',
    excerpt:
      'Separate metals, plastics, and paper the right way to improve pricing and reduce waste processing time.',
    category: 'Guide',
    readTime: '5 min read',
  },
  {
    title: 'Dubai Scrap Market Trends: What Affects Pricing?',
    excerpt:
      'Understand the major market factors that influence scrap pricing across different categories and seasons.',
    category: 'Insights',
    readTime: '6 min read',
  },
];

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-neutral-50 py-8 md:py-12">
      <div className="container-responsive">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600">
              ScrapNinja Blog
            </p>
            <h1 className="heading-1 mt-2">Latest Updates & Guides</h1>
            <p className="mt-3 max-w-2xl text-neutral-600 body-sm">
              Insights, tips, and updates to help Dubai customers and collectors get more value from every pickup.
            </p>
          </div>
          <Link href="/" className="btn-ghost btn-sm w-fit">
            Back to Home
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {BLOGS.map((blog) => (
            <article key={blog.title} className="card-elevated flex flex-col">
              <div className="mb-4 inline-flex w-fit rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                {blog.category}
              </div>
              <h2 className="heading-4">{blog.title}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600 flex-1">{blog.excerpt}</p>
              <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-4 text-sm text-neutral-500">
                <span>{blog.readTime}</span>
                <span className="font-semibold text-primary-600">Read more</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}