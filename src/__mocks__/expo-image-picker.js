jest.mock("expo-image-picker", () => {
  return {
    launchImageLibraryAsync: jest.fn().mockResolvedValue({
      cancelled: false,
      uri: "mocked-image-uri",
    }),
    requestMediaLibraryPermissionsAsync: jest.fn().mockResolvedValue({
      status: "granted",
    }),
  };
});
