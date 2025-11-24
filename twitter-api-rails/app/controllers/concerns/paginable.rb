module Paginable
  protected

  def get_links_serializer_options(link_paths, collection)
    {
      links: {
        currentPage: collection.current_page,
        nextPage: collection.next_page,
        hasMore: !collection.next_page.nil?
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
