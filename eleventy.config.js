const fs = require("fs");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // 광고 네트워크 인증 파일 (있을 때만 배포)
  for (const f of ["src/app-ads.txt", "src/ads.txt"]) {
    if (fs.existsSync(f)) eleventyConfig.addPassthroughCopy(f);
  }


  // 커스텀 도메인은 DNS 전환 후에 켭니다. src/CNAME.disabled → src/CNAME 로 이름 변경.
  if (fs.existsSync("src/CNAME")) {
    eleventyConfig.addPassthroughCopy("src/CNAME");
  }

  const favicon = "src/assets/images/common/favicon.png";
  if (fs.existsSync(favicon)) {
    eleventyConfig.addPassthroughCopy({ [favicon]: "favicon.png" });
  }

  eleventyConfig.addFilter("isoDate", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return isNaN(d) ? "" : d.toISOString().slice(0, 10);
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
