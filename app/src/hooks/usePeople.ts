import {
  getGetRecommendedPeopleQueryKey,
  getRecommendedPeople,
  useGetRecommendedPeople,
} from "@/api/tinder-api/api";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

const PER_PAGE = 15;

export const usePeople = () => {
  const queryClient = useQueryClient();
  const { data: recommendedPeople } = useGetRecommendedPeople(
    {
      page: 1,
      per_page: PER_PAGE,
    },
    {
      query: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    }
  );

  const people = useMemo(
    () => recommendedPeople?.data ?? [],
    [recommendedPeople]
  );

  const handlePrefetchNextPage = useCallback(async () => {
    const nextPage = (recommendedPeople?.current_page ?? 0) + 1;
    const shouldPrefetch =
      nextPage && nextPage <= (recommendedPeople?.last_page ?? 0);

    if (!shouldPrefetch) return;

    const newData = await getRecommendedPeople({
      page: nextPage,
      per_page: PER_PAGE,
    });

    queryClient.setQueryData(
      getGetRecommendedPeopleQueryKey({
        page: 1,
        per_page: PER_PAGE,
      }),
      (oldData: any) => {
        return {
          ...oldData,
          ...newData,
          data: [...(oldData?.data ?? []), ...(newData?.data ?? [])],
        };
      }
    );
  }, [queryClient, recommendedPeople]);

  console.log(people);

  return {
    people,
    handlePrefetchNextPage,
  };
};
