-- Delete all spam/fake swap entries
DELETE FROM public.swaps 
WHERE from_currency IN ('HACKED', 'TEST', 'Valention') 
   OR to_currency IN ('HACKED', 'TEST', 'Isanigger');

-- Create a validation function for swap currency names
CREATE OR REPLACE FUNCTION public.validate_swap_currencies()
RETURNS trigger AS $$
DECLARE
  allowed_currencies TEXT[] := ARRAY[
    'BTC','ETH','SOL','USDT','USDC','XRP','DOGE','ADA','DOT','MATIC',
    'AVAX','LINK','SHIB','UNI','AAVE','BNB','TRX','LTC','XLM','ALGO',
    'FTM','NEAR','ATOM','APT','ARB','OP','SUI','SEI','INJ','TIA',
    'PEPE','WIF','BONK','FLOKI','RENDER','FET','RNDR','GRT','FIL','AR',
    'STX','ICP','HBAR','VET','EOS','XTZ','EGLD','FLOW','MINA','KAVA',
    'CRO','MKR','SNX','COMP','LDO','RPL','PENDLE','GMX','DYDX','JUP',
    'RAY','ORCA','MNGO','MSOL','JITOSOL','PYTH','W','WEN','JTO',
    'SAND','MANA','AXS','GALA','IMX','ENJ','CHZ','APE',
    'DAI','BUSD','TUSD','FRAX','LUSD','USDD','GUSD','PAX','USDP',
    'WBTC','WETH','STETH','CBETH','RETH',
    'ASTR','CELO','ONE','ZIL','ICX','QTUM','ZEC','DASH','XMR','DCR',
    'KDA','ROSE','SCRT','FLUX','KAS','TAO','ONDO','ENA','ETHFI','EIGEN',
    'TON','NOT','DOGS','HMSTR','CATI','POL'
  ];
BEGIN
  IF NEW.from_currency IS NULL OR NEW.to_currency IS NULL THEN
    RAISE EXCEPTION 'Currency names cannot be null';
  END IF;

  IF NOT (UPPER(NEW.from_currency) = ANY(allowed_currencies)) THEN
    RAISE EXCEPTION 'Invalid from_currency: %. Not a recognized cryptocurrency.', NEW.from_currency;
  END IF;

  IF NOT (UPPER(NEW.to_currency) = ANY(allowed_currencies)) THEN
    RAISE EXCEPTION 'Invalid to_currency: %. Not a recognized cryptocurrency.', NEW.to_currency;
  END IF;

  -- Normalize to uppercase
  NEW.from_currency := UPPER(NEW.from_currency);
  NEW.to_currency := UPPER(NEW.to_currency);

  -- Cap amount to reasonable range
  IF NEW.amount <= 0 OR NEW.amount > 10000000 THEN
    RAISE EXCEPTION 'Invalid swap amount: %. Must be between 0 and 10,000,000.', NEW.amount;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger
CREATE TRIGGER validate_swap_before_insert
  BEFORE INSERT ON public.swaps
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_swap_currencies();