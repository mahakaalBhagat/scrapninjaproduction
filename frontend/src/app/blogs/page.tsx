'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BLOGS } from './data';

const INITIAL_VISIBLE_COUNT = 3;
const LOAD_MORE_COUNT = 2;

export default function BlogsPage() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const visibleBlogs = BLOGS.slice(0, visibleCount);
  const hasMore = visibleCount < BLOGS.length;

  const handleLoadMore = () => {
    setVisibleCount((current) => Math.min(current + LOAD_MORE_COUNT, BLOGS.length));
  };
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
          {visibleBlogs.map((blog) => (
            <article key={blog.slug} className="card-elevated flex flex-col">
              <div className="mb-4 inline-flex w-fit rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                {blog.category}
              </div>
              <h2 className="heading-4">{blog.title}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600 flex-1">{blog.excerpt}</p>
              <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-4 text-sm text-neutral-500">
                <span>{blog.readTime}</span>
                <a
                  href={blog.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary-600"
                >
                  Read more
                </a>
              </div>
            </article>
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              className="btn-primary btn-md"
            >
              Load more posts
            </button>
          </div>
        )}
      </div>
    </main>
  );
}