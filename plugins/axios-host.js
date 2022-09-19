export default function ({ $axios, $config }) {

    const api_domain = $config.api_domain;
    const api_protocol = $config.api_protocol;

    $axios.defaults.baseURL = `${api_protocol}://${api_domain}/`
}