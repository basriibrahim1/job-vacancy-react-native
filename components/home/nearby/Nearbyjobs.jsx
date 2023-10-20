import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../../constants";

import styles from "./nearbyjobs.style";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hooks/useFetch";

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, loading, error, refetch } = useFetch("search", {
    query: "Python",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
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
          data?.map((job, index) => <NearbyJobCard key={index} job={job} handleNavigate={() => router.push(`/job-details/${job.job_id}`)} />)
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
