import { useSyncExternalStore } from "react";

function subscribeNoop() {
  return () => {};
}

/**
 * "하이드레이션이 끝났는가"를 안전하게 읽는다. 서버(및 최초 클라이언트 렌더)에서는
 * 항상 false를 반환해 마크업이 일치하고, 하이드레이션 이후에만 true로 넘어간다.
 * Countdown처럼 현재 시각(Date.now())에 의존하는 값을 다룰 때 이 값으로 게이트한다.
 */
export function useHasMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}
