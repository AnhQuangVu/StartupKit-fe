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

    // Images: ensure we only send final cloud URLs (ignore blob: temporary previews)
    logo_url: isValidUrl(form.logo) ? form.logo : (isValidUrl(form.logoUrl) ? form.logoUrl : null),
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

    // team image - not present in the new form by default
    team_image_url: isValidUrl(form.teamImageUrl) ? form.teamImageUrl : (isValidUrl(form.teamImagePreview) ? form.teamImagePreview : null),

    // product image: pick the first valid URL from the images array
    product_image_url: firstValidUrl(form.productImages) || (isValidUrl(form.productImageUrl) ? form.productImageUrl : (isValidUrl(form.productImagePreview) ? form.productImagePreview : null)),

    profile_url: form.profileUrl || null,
    use_ai: !!form.use_ai || !!form.useAI || false,
  };

  return payload;
}

export default normalizeProjectPayload;
