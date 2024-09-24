export default function sidenavLogoLabel(theme, ownerState) {
  const { functions, transitions, breakpoints } = theme;
  const { miniSidenav } = ownerState;

  const { pxToRem } = functions;

  return {
    ml: 2,
    transition: transitions.create("opacity", {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),

    width: "100%",
    height: "100%",

    [breakpoints.up("xl")]: {
      opacity: miniSidenav ? 0 : 1,
    },
  };
}
