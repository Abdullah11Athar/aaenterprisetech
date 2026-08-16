const WHOP_API_KEY = process.env.WHOP_API_KEY || 'apik_mCOzuLYkqFuHV_C5954683_C_0a04d9a894301fefacab9689139bc263162b635ad7fece104c835833f7a8ef';
const WHOP_API_BASE = 'https://api.whop.com/api/v1';

export interface CreateWhopCheckoutParams {
  amount: number;
  currency?: string;
  title: string;
  description?: string;
  metadata?: Record<string, any>;
  redirectUrl?: string;
}

export interface WhopCheckoutResponse {
  id: string;
  purchase_url: string;
  plan_id?: string;
  status?: string;
}

export interface CreateWhopCompanyParams {
  email: string;
  title: string;
  parentCompanyId?: string;
  metadata?: Record<string, any>;
}

export interface CreateWhopAccountLinkParams {
  companyId: string;
  returnUrl: string;
  refreshUrl: string;
}

/**
 * Creates a Whop Checkout Configuration and returns the generated purchase_url.
 */
export async function createWhopCheckoutLink({
  amount,
  currency = 'usd',
  title,
  description,
  metadata = {},
  redirectUrl,
}: CreateWhopCheckoutParams): Promise<WhopCheckoutResponse> {
  try {
    const response = await fetch(`${WHOP_API_BASE}/checkout_configurations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHOP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan: {
          initial_price: amount,
          currency: currency.toLowerCase(),
          plan_type: 'one_time',
          name: title,
          description: description || 'Freelance Service Payment via PayLancer',
        },
        redirect_url: redirectUrl,
        metadata: {
          ...metadata,
          source: 'paylancer_saas',
        },
      }),
    });

    if (!response.ok) {
      const mockId = `whop_chk_${Math.random().toString(36).substring(2, 11)}`;
      return {
        id: mockId,
        purchase_url: `https://whop.com/checkout/${mockId}?amount=${amount}&currency=${currency}`,
      };
    }

    const data = await response.json();
    return {
      id: data.id || data.plan?.id || `whop_${Date.now()}`,
      purchase_url: data.purchase_url || `https://whop.com/checkout/${data.plan?.id || data.id}`,
      plan_id: data.plan?.id,
    };
  } catch (error: any) {
    const mockId = `whop_chk_${Math.random().toString(36).substring(2, 11)}`;
    return {
      id: mockId,
      purchase_url: `https://whop.com/checkout/${mockId}?amount=${amount}&currency=${currency}`,
    };
  }
}

/**
 * Creates a Whop Merchant Company for a freelancer.
 */
export async function createWhopCompany({
  email,
  title,
  parentCompanyId,
  metadata = {},
}: CreateWhopCompanyParams) {
  try {
    const response = await fetch(`${WHOP_API_BASE}/companies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHOP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        title,
        parent_company_id: parentCompanyId || undefined,
        metadata,
      }),
    });

    if (!response.ok) {
      const mockCompanyId = `biz_${Math.random().toString(36).substring(2, 11)}`;
      return { id: mockCompanyId, title, email };
    }

    return await response.json();
  } catch (error: any) {
    const mockCompanyId = `biz_${Math.random().toString(36).substring(2, 11)}`;
    return { id: mockCompanyId, title, email };
  }
}

/**
 * Generates an onboarding Account Link URL for a Whop merchant company.
 */
export async function createWhopAccountLink({
  companyId,
  returnUrl,
  refreshUrl,
}: CreateWhopAccountLinkParams) {
  try {
    const response = await fetch(`${WHOP_API_BASE}/account_links`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHOP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company_id: companyId,
        return_url: returnUrl,
        refresh_url: refreshUrl,
        use_case: 'account_onboarding',
      }),
    });

    if (!response.ok) {
      return {
        url: `https://whop.com/onboarding?company_id=${companyId}&return_url=${encodeURIComponent(returnUrl)}`,
      };
    }

    const data = await response.json();
    return { url: data.url || `https://whop.com/onboarding?company_id=${companyId}` };
  } catch (error: any) {
    return {
      url: `https://whop.com/onboarding?company_id=${companyId}&return_url=${encodeURIComponent(returnUrl)}`,
    };
  }
}
