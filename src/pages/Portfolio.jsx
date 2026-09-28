import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import { getCategories, getCategory, getPosts } from '../api/data.js';
import SEO from '../components/SEO.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import CategoryPills from '../components/CategoryPills.jsx';
import SearchBar from '../components/SearchBar.jsx';
import PostGrid from '../components/PostGrid.jsx';
import EmptyState from '../components/EmptyState.jsx';
import CtaBand from '../components/CtaBand.jsx';

const PAGE_SIZE = 12;

export default function Portfolio() {
  const [params, setParams] = useSearchParams();
  const categories = getCategories();
  const category = getCategory(params.get('category')) ? params.get('category') : 'all';
  const q = params.get('q') || '';
  const sort = params.get('sort') === 'featured' ? 'featured' : 'newest';
  const [visible, setVisible] = useState(PAGE_SIZE);
  // Local input state keeps typing smooth; the URL follows it.
  const [search, setSearch] = useState(q);

  useEffect(() => setVisible(PAGE_SIZE), [category, q, sort]);

  const { items, total } = useMemo(
    () => getPosts({ category, q, sort, limit: visible, offset: 0 }),
    [category, q, sort, visible]
  );

  const update = (key, value, fallback) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (!value || value === fallback) next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true }
    );
  };

  const onSearch = (value) => {
    setSearch(value);
    update('q', value, '');
  };

  const reset = () => {
    setSearch('');
    setParams(new URLSearchParams(), { replace: true });
  };
  const activeLabel = category === 'all' ? 'All work' : getCategory(category).label;

  return (
    <>
      <SEO
        title="Portfolio"
        path="/portfolio"
        description="Photos and reels of Emcee TJAY on stage: graduations, weddings and ruracios, corporate events and team building, comedy sets and celebrations."
      />
      <section className="page-header">
        <Container>
          <SectionHeading eyebrow="Portfolio" title="The work, live" as="h1">
            Graduations, weddings, corporate nights, comedy stages and the moments behind the mic.
          </SectionHeading>
        </Container>
      </section>

      <section className="section pt-0" aria-label="Portfolio">
        <Container>
          <div className="filter-bar">
            <CategoryPills categories={categories} active={category} onChange={(v) => update('category', v, 'all')} />
            <div className="filter-row">
              <SearchBar value={search} onChange={onSearch} />
              <div className="sort-select">
                <Form.Label htmlFor="portfolio-sort" className="visually-hidden">
                  Sort
                </Form.Label>
                <Form.Select id="portfolio-sort" value={sort} onChange={(e) => update('sort', e.target.value, 'newest')}>
                  <option value="newest">Newest first</option>
                  <option value="featured">Featured first</option>
                </Form.Select>
              </div>
            </div>
          </div>

          <p className="results-count" aria-live="polite">
            {activeLabel} · {total} {total === 1 ? 'post' : 'posts'}
            {q && <> matching “{q}”</>}
          </p>

          {items.length ? (
            <>
              <PostGrid posts={items} headingLevel="h2" />
              {items.length < total && (
                <div className="text-center mt-5">
                  <button type="button" className="btn btn-outline-brand" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                    Load more ({total - items.length} more)
                  </button>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              title="No matching posts"
              action={
                <button type="button" className="btn btn-gold" onClick={reset}>
                  Show all work
                </button>
              }
            >
              Try another search or category.
            </EmptyState>
          )}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
