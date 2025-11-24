# Define the transformer first
class LowerCamelTransformer < Blueprinter::Transformer
  def transform(hash, _object, _options)
    # Must mutate in place; Blueprinter does not use the return value
    hash.transform_keys! { |key| key.to_s.camelize(:lower) }
  end
end

# Then configure Blueprinter to use it
Blueprinter.configure do |config|
  config.default_transformers = [ LowerCamelTransformer ]
end
