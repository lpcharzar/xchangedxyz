
CREATE TABLE public.swaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount NUMERIC NOT NULL,
  from_currency TEXT NOT NULL,
  to_currency TEXT NOT NULL,
  from_icon TEXT,
  to_icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.swaps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read swaps" ON public.swaps FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can insert swaps" ON public.swaps FOR INSERT TO anon, authenticated WITH CHECK (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.swaps;

INSERT INTO public.swaps (amount, from_currency, to_currency, from_icon, to_icon, created_at) VALUES
  (77, 'ETH', 'BTC', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/eth.png', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/btc.png', now() - interval '40 minutes'),
  (27, 'ADA', 'ETH', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/ada.png', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/eth.png', now() - interval '31 minutes'),
  (28, 'DOT', 'SOL', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/dot.png', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/sol.png', now() - interval '20 minutes'),
  (34, 'SOL', 'USDT', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/sol.png', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/usdt.png', now() - interval '15 minutes'),
  (19, 'MATIC', 'ETH', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/matic.png', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/eth.png', now() - interval '6 minutes'),
  (15, 'BTC', 'SOL', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/btc.png', 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/sol.png', now() - interval '3 minutes');
