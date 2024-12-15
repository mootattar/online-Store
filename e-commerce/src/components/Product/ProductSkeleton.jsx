import { Skeleton, Box } from "@mui/material";

const ProductSkeleton = () => {
  return (
    <div className="product-card-container">
      <div className="product-card">
        {/* Image Gallery Skeleton */}
        <Box className="image-gallery" mb={2}>
          <Skeleton variant="rectangular" width="100%" height={300} />
          <Box className="images-group" mt={2} display="flex" gap={2}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={60}
                height={60}
                animation="wave"
              />
            ))}
          </Box>
        </Box>

        {/* Product Info Skeleton */}
        <div className="product-info">
          {/* Title Skeleton */}
          <Box mb={2}>
            <Skeleton variant="text" width="60%" height={40} />
          </Box>

          {/* Rating Skeleton */}
          <Box
            className="product-rating-container"
            display="flex"
            alignItems="center"
            gap={1}
            mb={2}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} variant="circular" width={24} height={24} />
            ))}
            <Skeleton variant="text" width="20%" />
          </Box>

          {/* Price Skeleton */}
          <Box mb={2}>
            <Skeleton variant="text" width="40%" />
          </Box>

          {/* Description Skeleton */}
          <Box mb={2}>
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="70%" />
          </Box>

          {/* Sizes Skeleton */}
          <Box className="sizes-container" mb={2}>
            <Skeleton variant="text" width="20%" />
            <Box display="flex" gap={2} mt={1}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={40}
                  height={40}
                />
              ))}
            </Box>
          </Box>

          {/* Buttons Skeleton */}
          <Box display="flex" flexDirection="column" gap={2} mb={2}>
            <Skeleton variant="rectangular" width="100%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={40} />
          </Box>

          {/* Free Shipping Skeleton */}
          <Box
            className="free-shipping"
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="70%" />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
