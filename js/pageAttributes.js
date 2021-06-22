const url_page_attr = "https://gist.githubusercontent.com/ooyebade/35bd9e20924a25fdaa1363bc96ce4bfe/raw/c2614bc96ba53467b5246276f6f9d0c87bb8a695/page-attribute.html";

window.onload = function() 
{
    $("nav").load(`${url_page_attr} nav`);
    $("footer").load(`${url_page_attr} #footer-details`);
};