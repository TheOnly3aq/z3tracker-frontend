"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Camera, Heart, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import { usePhotos } from "@/hooks/use-photos";

export default function Photos() {
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set());
  const { t } = useLanguage();
  const { photos, loading, error, refetch } = usePhotos({ website: "Z3Radar" });

  useEffect(() => {
    const savedLikes = Cookies.get("likedPhotos");
    if (savedLikes) {
      try {
        const likedIds = JSON.parse(savedLikes) as string[];
        setLikedPhotos(new Set(likedIds));
      } catch (error) {
        console.error("Error parsing liked photos from cookies:", error);
      }
    }
    document.title = "Z3 RADAR - Photos of the BMW Z3 | Netherlands";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Browse stunning BMW Z3 photos and images. High-quality gallery showcasing exterior, interior, and detail shots of the BMW Z3 convertible in the Netherlands."
      );
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      const currentKeywords = metaKeywords.getAttribute("content") || "";
      const additionalKeywords =
        ", BMW Z3 photos, BMW convertible gallery, automotive photography, BMW vehicle images, car photo gallery, BMW Z3 foto's, BMW cabrio gallerij, automotive fotografie, BMW voertuig afbeeldingen, auto foto gallerij, BMW Z3 beelden, cabrio foto's Nederland, voertuig afbeelding gallerij, BMW Z3 plaatjes, cabrio auto foto's, Nederlandse auto foto's, BMW beelden gallerij, voertuig fotografie, auto afbeeldingen Nederland, BMW cabrio beelden, auto fotogallerij, voertuig plaatjes Nederland";
      metaKeywords.setAttribute(
        "content",
        currentKeywords + additionalKeywords
      );
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://Z3radar.com/photos");

    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.type = "application/ld+json";
    breadcrumbScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://Z3radar.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Photos",
          item: "https://Z3radar.com/photos",
        },
      ],
    });
    document.head.appendChild(breadcrumbScript);

    return () => {
      document.head.removeChild(breadcrumbScript);
    };
  }, []);

  useEffect(() => {
    Cookies.set("likedPhotos", JSON.stringify(Array.from(likedPhotos)), {
      expires: 30,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }, [likedPhotos]);

  const toggleLike = (photoId: string) => {
    setLikedPhotos((prev) => {
      const newLikedPhotos = new Set(prev);
      if (newLikedPhotos.has(photoId)) {
        newLikedPhotos.delete(photoId);
      } else {
        newLikedPhotos.add(photoId);
      }
      return newLikedPhotos;
    });
  };

  return (
    <div className="space-y-8">
      <div className="ml-12 lg:ml-0 ">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
          <Camera className="w-8 h-8 text-blue-500" />
          {t("navigation.photos")}
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-lg">{t("photos.subtitle")}</p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <motion.div
          className="flex flex-col items-center justify-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
          <p className="text-gray-400 text-lg">Loading photos...</p>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          className="flex flex-col items-center justify-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AlertCircle className="w-8 h-8 text-blue-500 mb-4" />
          <p className="text-gray-400 text-lg mb-4">Failed to load photos</p>
          <button
            onClick={refetch}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && !error && photos.length === 0 && (
        <motion.div
          className="flex flex-col items-center justify-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Camera className="w-8 h-8 text-gray-500 mb-4" />
          <p className="text-gray-400 text-lg">
            No photos available at the moment
          </p>
        </motion.div>
      )}

      {/* Photos Grid */}
      {!loading && !error && photos.length > 0 && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="aspect-[4/3]"
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Card className="card-gradient group overflow-hidden cursor-pointer border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm relative h-full">
                <motion.div
                  className="relative w-full h-full overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={photo.imageUrl || "/placeholder.svg"}
                      alt={photo.description || photo.title}
                      fill
                      className="object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Like button - positioned outside the scaled container */}
                <motion.div
                  className="absolute top-3 right-3 flex items-center justify-center z-10"
                  initial={{ opacity: 1 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(photo.id);
                    }}
                    className="p-2 glass-effect-cookie-banner rounded-full hover:bg-white/10 transition-colors duration-200 flex items-center justify-center"
                    aria-label={
                      likedPhotos.has(photo.id) ? "Unlike photo" : "Like photo"
                    }
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                  >
                    <motion.div
                      animate={
                        likedPhotos.has(photo.id) ? { scale: [1, 1.3, 1] } : {}
                      }
                      transition={{ duration: 0.3 }}
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors duration-200 ${
                          likedPhotos.has(photo.id)
                            ? "text-blue-500 fill-blue-500"
                            : "text-blue-400 hover:text-blue-300"
                        }`}
                      />
                    </motion.div>
                  </motion.button>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div
        className="text-center mt-12 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-white mb-3">
          {t("photos.footerTitle")}
        </h2>
        <p className="text-gray-400 text-lg">
          {t("photos.footerSubtitle")}
          <a
            href="mailto:info@Z3 RADAR.nl"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            info@z3radar.com
          </a>
        </p>
      </motion.div>
    </div>
  );
}
