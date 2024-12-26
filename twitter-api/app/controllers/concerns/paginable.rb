module Paginable
  protected

  def get_links_serializer_options(link_paths, collection)
    {
      links: {
        first: send(link_paths, page: 1),
        last: send(link_paths, page: collection.total_pages),
        prev: send(link_paths, page: collection.prev_page),
        next: send(link_paths, page: collection.next_page),
        currentPage: collection.current_page,
        nextPage: collection.next_page,
        hasMore: !collection.last_page?
      }
    }
  end

  def current_page
    (params[:page] || 1).to_i
  end

  def per_page
    (params[:per_page] || 10).to_i
  end
end
