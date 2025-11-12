import { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
// eslint-disable-next-line no-unused-vars
import { API_BASE, fetchWithTimeout, authHeaders } from "../../config/api";

export default function MentorList({
  small = false,
  expertiseAreas = null,
  industry = null,
  search = null,
  sortBy = "created_at",
  order = "desc"
}) {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    has_next: false,
    has_previous: false
  });

  const ITEMS_PER_ROW = small ? 2 : 3;
  const ROWS = small ? 2 : 3;
  const ITEMS_PER_PAGE = ITEMS_PER_ROW * ROWS;
  const [page, setPage] = useState(1);

  // Fetch mentors from API
  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      setError(null);

      try {
        // Build query params
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: ITEMS_PER_PAGE.toString(),
          is_active: 'true',
          sort_by: sortBy,
          order: order
        });

        if (expertiseAreas) queryParams.append('expertise_areas', expertiseAreas);
        if (industry) queryParams.append('industry', industry);
        if (search) queryParams.append('search', search);

        const url = `${API_BASE}/users/mentors?${queryParams.toString()}`;
        const token = localStorage.getItem("token");

        const response = await fetchWithTimeout(url, {
          method: "GET",
          headers: token ? authHeaders(token) : {},
          timeout: 10000
        });

        if (!response.ok) {
          throw new Error("Failed to fetch mentors");
        }

        const result = await response.json();
        const data = result.data || result; // Handle both {data: {...}} and direct response

        setMentors(data.items || []);
        setPagination(data.pagination || {
          current_page: 1,
          total_pages: 1,
          total_items: 0,
          has_next: false,
          has_previous: false
        });
      } catch (err) {
        console.error("❌ API Error:", err);
        setError(err.message || "Không thể tải danh sách mentor");
        setMentors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [page, ITEMS_PER_PAGE, expertiseAreas, industry, search, sortBy, order]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [expertiseAreas, industry, search, sortBy, order]);

  return (
    <section className="max-w-6xl mx-auto mt-5 text-center px-4 sm:px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Kết nối với Mentor</h2>
      <p className="text-gray-500 mb-6 text-sm md:text-base">Xây dựng kết nối giá trị với những mentor giàu kinh nghiệm</p>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && mentors.length === 0 && (
        <div className="py-20 text-gray-500">
          <p className="text-lg">Không tìm thấy mentor nào</p>
        </div>
      )}

      {/* Mentors Grid */}
      {!loading && !error && mentors.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-4 auto-rows-fr">
            {mentors.map((mentor) => (
              <div className="h-full" key={mentor.id}>
                <ProfileCard
                  avatar={mentor.avatar_url}
                  banner={mentor.cover_url}
                  name={mentor.full_name}
                  role="mentor"
                  title={mentor.mentor_profile?.current_position}
                  company={mentor.mentor_profile?.company}
                  bio={mentor.bio}
                  location={mentor.location}
                  expertise_areas={mentor.mentor_profile?.expertise_areas}
                  achievements={mentor.achievements}
                  community_link={mentor.mentor_profile?.community_link}
                  is_active={mentor.is_active}
                  button="Xem hồ sơ"
                  onClick={() => {
                    // Navigate to public profile page
                    window.location.href = `/public-profile/${mentor.id}`;
                  }}
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.total_pages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {pagination.has_previous && (
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-full border-2 transition-all duration-150 text-lg font-bold bg-white border-gray-200 text-gray-500 hover:bg-[#fff6e0] hover:border-[#fdc142] hover:text-[#fdc142]"
                  onClick={() => setPage(page - 1)}
                  aria-label="Trang trước"
                >
                  &#8592;
                </button>
              )}

              {[...Array(pagination.total_pages)].map((_, idx) => {
                const pageNum = idx + 1;
                // Show first page, last page, current page, and pages around current
                const showPage =
                  pageNum === 1 ||
                  pageNum === pagination.total_pages ||
                  Math.abs(pageNum - page) <= 1;

                if (!showPage && pageNum === 2) {
                  return <span key={idx} className="text-gray-400 px-2">...</span>;
                }
                if (!showPage && pageNum === pagination.total_pages - 1) {
                  return <span key={idx} className="text-gray-400 px-2">...</span>;
                }
                if (!showPage) return null;

                return (
                  <button
                    key={idx}
                    className={`w-9 h-9 flex items-center justify-center rounded-full border-2 mx-1 transition-all duration-150 text-base font-semibold ${pageNum === page
                      ? "bg-[#fdc142] border-[#fdc142] text-white shadow-lg"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-[#fff6e0] hover:border-[#fdc142] hover:text-[#fdc142]"
                      }`}
                    onClick={() => setPage(pageNum)}
                    aria-label={`Trang ${pageNum}`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {pagination.has_next && (
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-full border-2 transition-all duration-150 text-lg font-bold bg-white border-gray-200 text-gray-500 hover:bg-[#fff6e0] hover:border-[#fdc142] hover:text-[#fdc142]"
                  onClick={() => setPage(page + 1)}
                  aria-label="Trang sau"
                >
                  &#8594;
                </button>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
