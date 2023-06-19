export default function getRouteParameter() {
  return window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );
}
