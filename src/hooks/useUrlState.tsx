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
  // This method will take an state array encoding in the url and add the new item to that array
  // re-encode and push to url
  // if that item exists
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
    router.push(`${location}?${query}`, { scroll: false });
  };

  // This method will replace the state in the url with the new element
  const replaceState = (
    element: any,
    prefName: string,
    location: string = pathname,
  ): void => {
    // console.log(searchParams.toString());

    const newState = JSONCrush.crush(JSON.stringify(element));
    const newPref = createQueryString(prefName, newState);

    router.push(`${location}?${newPref}`, { scroll: false });
  };

  // This will replace all the states that are passed similar to replaceState
  const replaceMultiple = (
    elements: { element: any; prefName: string }[],
    location: string = pathname,
  ) => {
    let currParams = new URLSearchParams(searchParams);
    const encoded = elements.map((item) => {
      return {
        element: JSONCrush.crush(JSON.stringify(item.element)),
        prefName: item.prefName,
      };
    });
    encoded.map((item) => currParams.set(item.prefName, item.element));
    router.push(`${location}?${currParams}`, { scroll: false });
  };

  // decode url states
  const decode = (pref: string) => {
    const encodedValue = searchParams.get(pref);
    return encodedValue && JSON.parse(JSONCrush.uncrush(encodedValue));
  };

  return { decode, replaceState, replaceMultiple, appendState, searchParams };
}
