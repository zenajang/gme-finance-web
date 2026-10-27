// Metricool tracker — rendered inside <head> per Metricool's install guidance.
const METRICOOL_HASH = 'cf2e6481e66b64d9809131e7d3be30a5';

export default function Metricool() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}
          loadScript(function(){beTracker.t({hash:"${METRICOOL_HASH}"})});
        `,
      }}
    />
  );
}
