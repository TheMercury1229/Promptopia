"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { SearchIcon } from "lucide-react";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filtered = posts.filter((post) =>
        post.tag.toLowerCase().includes(searchText.toLowerCase())||
        post.creator.username.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchText, posts]);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search_input peer"
          required
        />
        <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </form>
      {filteredPosts.length > 0 ? <PromptCardList data={filteredPosts} handleTagClick={() => {}} />:
      <p className="mt-6 text-xl text-gray-600">No results found. Search for something else...</p>}
    </section>
  );
};

export default Feed;
