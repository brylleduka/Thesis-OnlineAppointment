export const scrollView = ref => {
  if (ref.current)
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
};
