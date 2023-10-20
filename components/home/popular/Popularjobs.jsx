import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../../constants";

import styles from "./popularjobs.style";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hooks/useFetch";

const Popularjobs = () => {
  const router = useRouter();
  const { data, loading, error, refetch } = useFetch("search", {
    query: "Python",
    num_pages: 1,
  });
  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popularjobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>See All Jobs</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>{error.message}</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => <PopularJobCard item={item} selectedJob={selectedJob} handleCardPress={handleCardPress} />}
            keyExtractor={({ item }) => item?.id}
            key={(_, index) => index + 1}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
