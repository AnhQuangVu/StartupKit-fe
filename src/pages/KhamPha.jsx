import React, { useState, useMemo, useEffect, useRef } from "react";
import StartupList from "../components/common/StartupList";
import CompetitionList from "../components/home/CompetitionList";
import InvestorList from "../components/common/InvestorList";
import MentorList from "../components/common/MentorList";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import StartupCard from "../components/common/StartupCard";
import { searchPublishedProjects } from "../api/publicProjects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faEnvelope, faBolt } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";

export default function KhamPha() {
  const { isLoggedIn, user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [stage, setStage] = useState("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // search results state
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nextCursor, setNextCursor] = useState(null);
  const [total, setTotal] = useState(null);
  const abortRef = useRef(null);

  // lightweight categories for filters
  const categories = [
    { key: "all", label: "Tất cả" },
    { key: "tech", label: "Công nghệ" },
    { key: "agri", label: "Nông nghiệp" },
    { key: "fin", label: "Fintech" },
    { key: "edu", label: "Edtech" },
  ];

  const stages = [
    { key: "all", label: "Tất cả giai đoạn" },
    { key: "y-tuong", label: "Ý tưởng" },
    { key: "prototype", label: "Prototype" },
    { key: "beta", label: "Beta" },
    { key: "launch", label: "Ra mắt" },
  ];

  const handleSearchChange = (e) => setQuery(e.target.value);
  const handleCategoryClick = (k) => setCategory(k);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    // stub subscribe action - in future call API
    setSubscribed(true);
  };

  // derive whether filters/search are active
  const filtersActive = query.trim().length > 0 || category !== "all" || stage !== "all";

  // On mount: read URL params to hydrate state
  useEffect(() => {
    const qParam = searchParams.get("q") || "";
    const catParam = searchParams.getAll("industry[]")[0] || searchParams.get("industry") || "all";
    const stageParam = searchParams.getAll("stage[]")[0] || searchParams.get("stage") || "all";
    if (qParam) setQuery(qParam);
    if (catParam) setCategory(catParam);
    if (stageParam) setStage(stageParam);
    // If any active, trigger initial load immediately
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync filters to URL
  useEffect(() => {
    const params = {};
    if (query.trim()) params.q = query.trim();
    if (category !== "all") params["industry[]"] = category;
    if (stage !== "all") params["stage[]"] = stage;
    setSearchParams(params, { replace: true });
  }, [query, category, stage, setSearchParams]);

  // Debounced search when filters change
  useEffect(() => {
    if (!filtersActive) {
      // reset results when filters cleared
      setResults([]);
      setNextCursor(null);
      setTotal(null);
      setError("");
      if (abortRef.current) abortRef.current.abort();
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setError("");
    const t = setTimeout(async () => {
      try {
        const { items, nextCursor: nc, total: tt } = await searchPublishedProjects({
          q: query.trim() || undefined,
          industry: category !== "all" ? category : undefined,
          stage: stage !== "all" ? stage : undefined,
          limit: 24,
          sort: "-created_at",
        }, { signal: controller.signal });
        setResults(items || []);
        setNextCursor(nc || null);
        setTotal(tt ?? (items ? items.length : 0));
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Search error', err);
          setError("Không thể tải kết quả. Vui lòng thử lại.");
        }
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => {
      clearTimeout(t);
      controller.abort();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category, stage]);

  const handleLoadMore = async () => {
    if (!nextCursor) return;
    const controller = new AbortController();
    try {
      setLoading(true);
      const { items, nextCursor: nc } = await searchPublishedProjects({
        q: query.trim() || undefined,
        industry: category !== "all" ? category : undefined,
        stage: stage !== "all" ? stage : undefined,
        limit: 24,
        cursor: nextCursor,
        sort: "-created_at",
      }, { signal: controller.signal });
      setResults(prev => [...prev, ...(items || [])]);
      setNextCursor(nc || null);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Load more error', err);
        setError("Không thể tải thêm kết quả.");
      }
    } finally {
      setLoading(false);
    }
  };

  // show a quick stats summary (static for now)
  const stats = useMemo(
    () => [
      { number: "4.000+", label: "Startup tại Việt Nam" },
      { number: "150+", label: "Nhà đầu tư & Quỹ" },
      { number: "300+", label: "Sự kiện/năm" },
      { number: "$2.1B", label: "Vốn đầu tư (2024)" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar isLoggedIn={isLoggedIn} user={user} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <header className="text-center mb-8">
          <div className="inline-block bg-white border border-gray-200 rounded-2xl px-6 py-5 shadow-md">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Khám Phá</h1>
            <p className="text-gray-600 mt-2">Tìm kiếm startup, sự kiện, nhà đầu tư và mentor phù hợp với bạn.</p>
          </div>
        </header>

  {/* search + filters compact */}
        <div className="mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FontAwesomeIcon icon={faSearch} /></span>
                <input value={query} onChange={handleSearchChange} placeholder="Tìm kiếm startup, sự kiện, nhà đầu tư..." className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200" />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="hidden sm:flex gap-2">
                  {categories.map(c => (
                    <button key={c.key} onClick={() => handleCategoryClick(c.key)} className={`px-3 py-2 rounded-full text-sm font-medium ${category===c.key ? 'bg-[#FFCE23] text-black' : 'bg-white text-gray-700 border border-gray-200'}`}>
                      {c.label}
                    </button>
                  ))}
                </div>
                {/* Stage selector */}
                <select value={stage} onChange={(e)=>setStage(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white">
                  {stages.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                </select>
                <button onClick={() => { setQuery(''); setCategory('all'); setStage('all'); }} className="px-4 py-2 rounded-lg bg-white border border-gray-200">Reset</button>
              </div>
            </div>
          </div>
        </div>

        {/* Search results */}
        {filtersActive && (
          <section className="mb-8">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Kết quả tìm kiếm {total != null && (<span className="text-gray-500 font-normal">({total})</span>)}</h3>
                {loading && <span className="text-sm text-gray-500">Đang tải…</span>}
              </div>
              {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(results || []).map((p) => {
                  const card = {
                    id: p.id,
                    img: p.logo_url || `https://picsum.photos/300/300?random=${p.id}`,
                    title: p.name,
                    desc: p.tagline || p.description || 'Khởi nghiệp sáng tạo',
                    tag: p.industry || 'Startup',
                    stage: p.stage,
                    members: p.member_count || 0,
                    raised: p.capital_source || 'N/A',
                    link: `/projects/${p.id}`
                  };
                  return (
                    <div key={p.id} className="w-full"><StartupCard {...card} /></div>
                  );
                })}
              </div>
              {nextCursor && (
                <div className="flex justify-center mt-4">
                  <button onClick={handleLoadMore} className="px-4 py-2 rounded-lg bg-[#FFCE23] text-black font-semibold disabled:opacity-60" disabled={loading}>
                    {loading ? 'Đang tải…' : 'Tải thêm'}
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s,i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-md border border-gray-200 text-center">
              <div className="text-2xl font-bold text-gray-900">{s.number}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Trends */}
        <section className="mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Xu hướng Khởi nghiệp 2025</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100"> <h4 className="font-semibold">AI & Automation</h4><p className="text-sm text-gray-600">AI trong SaaS và tự động hoá quy trình.</p></div>
              <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100"> <h4 className="font-semibold">Sustainability</h4><p className="text-sm text-gray-600">Năng lượng sạch & kinh doanh tuần hoàn.</p></div>
              <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100"> <h4 className="font-semibold">Healthtech & EduTech</h4><p className="text-sm text-gray-600">Chăm sóc sức khoẻ số & công nghệ giáo dục.</p></div>
            </div>
          </div>
        </section>

        {/* Lists */}
        {!filtersActive && (
          <section className="mb-8">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
              <StartupList columns={3} rows={4} />
            </div>
          </section>
        )}

        {!filtersActive && (
          <section className="mb-8">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
              <CompetitionList />
            </div>
          </section>
        )}

        {!filtersActive && (
          <section className="mb-8">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
              <InvestorList />
            </div>
          </section>
        )}

        {!filtersActive && (
          <section className="mb-8">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
              <MentorList />
            </div>
          </section>
        )}



        {/* resources */}
        <section className="mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Tài nguyên hữu ích</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Hướng dẫn gọi vốn (checklist)","Mẫu pitchdeck","Hợp đồng mẫu","Chương trình hỗ trợ sinh viên","Danh sách quỹ","Khu vực pháp lý","Tài liệu phát triển sản phẩm","Mạng lưới mentor"].map((t,i)=>(
                <a key={i} className="block p-4 bg-white rounded-lg shadow-sm border border-gray-200" href="/coming-soon">{t}</a>
              ))}
            </div>
          </div>
        </section>

        {/* newsletter CTA */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold">Nhận tin Khám Phá</h4>
              <p className="text-sm text-gray-600">Đăng ký để nhận cập nhật về sự kiện, quỹ và chương trình.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <input type="email" value={newsletterEmail} onChange={(e)=>setNewsletterEmail(e.target.value)} placeholder="Email của bạn" className="px-4 py-3 rounded-lg border border-gray-200 w-full md:w-72" />
              <button className="bg-[#FFCE23] text-black px-4 py-2 rounded-lg" disabled={subscribed}>{subscribed? 'Đã đăng ký' : 'Đăng ký'}</button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
