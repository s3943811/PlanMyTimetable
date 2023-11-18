import { useState, useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

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
  //   to push a new state to the back
  const pushState = (
    element: any,
    prefName: string,
    location: string = pathname,
  ): void => {
    const newState = encodeURIComponent(btoa(JSON.stringify(element)));
    const newPref = createQueryString(prefName, newState);

    router.push(`${location}?${searchParams}&${newPref}`, { scroll: false });
  };
  // to replace the instance of the state or create a new state
  const appendState = (
    element: any,
    prefName: string,
    location: string = pathname,
  ): void => {
    const state: Array<any> = decode(prefName);
    let encoded;
    let params = new URLSearchParams(searchParams);
    if (state) {
      state.push(element);
      encoded = encodeURIComponent(btoa(JSON.stringify(state)));
      params.delete(prefName);
    } else {
      encoded = encodeURIComponent(btoa(JSON.stringify(element)));
    }
    encoded = createQueryString(prefName, encoded);
    router.replace(`${location}?${params}&${encoded}`, { scroll: false });
  };
  // to replace url state with states to be kept and new state
  const replaceState = (
    element: any,
    prefName: string,
    keep: string[] = [],
    location: string = pathname,
  ): void => {
    const keepParams = keep.map((item) => searchParams.get(item));

    const newState = encodeURIComponent(btoa(JSON.stringify(element)));
    const newPref = createQueryString(prefName, newState);

    router.push(`${location}?${keepParams}&${newPref}`, { scroll: false });
  };
  // decode url states
  const decode = (pref: string) => {
    const encodedValue = searchParams.get(pref);
    return encodedValue && JSON.parse(atob(decodeURIComponent(encodedValue)));
  };

  return { decode, replaceState, pushState, appendState };
}
