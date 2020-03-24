// Generate an picture tag with image src URLs which use Neltify image transforms

module.exports = (url, alt = "Missing alt text") => {
    return `<picture>
        <source srcset="/assets/imgs/${url}?nf_resize=fit&w=200&h=200" media="(min-width: 1200px)">
        <source srcset="/assets/imgs/${url}?nf_resize=fit&w=100&h=100" media="(min-width: 740px)">
        <img src="/assets/imgs/${url}?nf_resize=fit&w=100&h=100" alt="${alt}" />
    </picture>`;
};