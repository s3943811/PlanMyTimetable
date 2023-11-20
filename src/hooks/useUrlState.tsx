import { useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import JSONCrush from "jsoncrush";

export function useUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  // to replace the instance of the state or create a new state
  const appendState = (
    element: any,
    prefName: string,
    location: string = pathname,
  ) => {
    const state: Array<any> = decode(prefName);
    let encoded;
    let params = new URLSearchParams(searchParams);
    if (state) {
      state.push(element);
      encoded = JSONCrush.crush(JSON.stringify(state));
      params.delete(prefName);
    } else if (Array.isArray(element)) {
      encoded = JSONCrush.crush(JSON.stringify(element));
    } else {
      encoded = JSONCrush.crush(JSON.stringify([element]));
    }

    const query = createQueryString(prefName, encoded);
    router.replace(`${location}?${query}`, { scroll: false });
  };
  // to replace url state with states to be kept and new state
  const replaceState = (
    element: any,
    prefName: string,
    location: string = pathname,
  ): void => {
    console.log(searchParams.toString());

    const newState = JSONCrush.crush(JSON.stringify(element));
    const newPref = createQueryString(prefName, newState);

    router.push(`${location}?${newPref}`, { scroll: false });
  };
  // decode url states
  const decode = (pref: string) => {
    const encodedValue = searchParams.get(pref);
    return encodedValue && JSON.parse(JSONCrush.uncrush(encodedValue));
  };

  return { decode, replaceState, appendState, searchParams };
}
