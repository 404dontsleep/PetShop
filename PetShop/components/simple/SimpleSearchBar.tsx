import { useState } from "react";
import { Searchbar } from "react-native-paper";

export const SimpleSearchBar = () => {
  const [search, setSearch] = useState("");
  const _SearchBar = <Searchbar value={search} onChangeText={setSearch} />;
  return { search, _SearchBar };
};
