// Utility to normalize the form state coming from ProjectProfileFullForm
// into the flat payload expected by the backend API.
export function normalizeProjectPayload(form = {}) {
  const isValidUrl = (u) => typeof u === 'string' && u.length > 0 && !u.startsWith('blob:');
  const firstValidUrl = (arr) => {
    if (!Array.isArray(arr)) return null;
    for (const v of arr) if (isValidUrl(v)) return v;
    return null;
  };

  const payload = {
    // Basic mappings (fallback to older field names if present)
    name: form.projectName || form.name || '',
    tagline: form.tagline || '',
    stage: form.stage && form.stage !== '' ? form.stage : null,
    // Prefer mainIdea as description, fallback to productValue or any description field
    description: form.mainIdea || form.productValue || form.description || '',

  // Images: map to objects { url, public_id } — public_id may be null if Cloudinary doesn't provide it
  logo: isValidUrl(form.logo) ? { url: form.logo, public_id: null } : (isValidUrl(form.logoUrl) ? { url: form.logoUrl, public_id: null } : null),
  website_url: form.website || form.website_url || null,

    industry: form.field || form.industry || '',
    pain_point: form.advantage || form.products || '',
    solution: form.productValue || form.solution || '',
    product: form.productValue || form.products || form.product || '',

    customer_segment: form.targetCustomer || form.customerSegment || '',
    customer_features: form.productCoreValue || form.customerFeatures || '',
    market_size: form.marketSize || form.market_size || '',
    market_area: form.marketArea || form.market_area || '',

    deployment_location: form.location || '',
    business_model: form.businessPlan || form.business_model || '',
    revenue_method: form.potentialResult || form.revenue_method || '',
    distribution_channel: form.distribution || form.distribution_channel || '',

    partners: form.partners || '',
    cost_estimate: form.cost_estimate || form.costEstimate || null,
    capital_source: form.capital_source || form.capitalSource || null,
    revenue_goal: form.revenue_goal || form.revenueGoal || null,

    // member_count isn't collected explicitly in the new form; leave null unless provided
    member_count: (form.member_count && form.member_count !== '') ? Number(form.member_count) : (form.memberCount ? Number(form.memberCount) : null),
    member_skills: form.member_skills || form.memberSkills || '',

    resources: form.resources || '',

    // team image - converted to object
    team_image: isValidUrl(form.teamImageUrl) ? { url: form.teamImageUrl, public_id: null } : (isValidUrl(form.teamImagePreview) ? { url: form.teamImagePreview, public_id: null } : null),

    // product images: convert array of valid URLs into objects
    product_images: Array.isArray(form.productImages)
      ? form.productImages.filter(isValidUrl).map(u => ({ url: u, public_id: null }))
      : (isValidUrl(form.productImageUrl) ? [{ url: form.productImageUrl, public_id: null }] : (isValidUrl(form.productImagePreview) ? [{ url: form.productImagePreview, public_id: null }] : [])),

    profile_url: form.profileUrl || null,
    use_ai: !!form.use_ai || !!form.useAI || false,
  };

  // include stages array (map only needed fields) and current_stage object if present
  if (Array.isArray(form.stages)) {
    payload.stages = form.stages.map(s => ({
      id: s.id || null,
      title: s.title || '',
      description_html: s.description_html || '',
      start_date: s.start_date || null,
      end_date: s.end_date || null,
      status: s.status || 'planned',
      deliverables: Array.isArray(s.deliverables) ? s.deliverables : [],
      budget: s.budget || 0,
      progress_percent: s.progress_percent || 0,
      dependencies: Array.isArray(s.dependencies) ? s.dependencies : []
    }));
  }
  // currentStage: keep as string enum/value (not tied to stages array)
  payload.current_stage = form.currentStage || null;
  // human-readable label for current stage (frontend-friendly)
  const PHASE_LABELS = {
    idea: 'Ý tưởng',
    research: 'Nghiên cứu thị trường',
    product: 'Hoàn thiện sản phẩm',
    survey: 'Khảo sát',
    launch: 'Launch'
  };
  payload.current_stage_label = form.currentStage ? (PHASE_LABELS[form.currentStage] || null) : null;

  return payload;
}

export default normalizeProjectPayload;
