// collate multiple modules into one post

module.exports = (url, alt = "Missing alt text") => {
    return `<picture>
        <source srcset="/assets/imgs/${url}?nf_resize=fit&w=1000" media="(min-width: 740px)">
        <img src="/assets/imgs/${url}?nf_resize=fit&w=600" alt="${alt}" />
    </picture>`;
};
