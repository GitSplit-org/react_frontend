import  { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { PiHandsClapping , PiHandsClappingFill} from "react-icons/pi"; // Clapping hands icons

const LikeButton = ({ initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        className={`w-12 h-12 rounded-full flex items-center justify-center focus:outline-none ${
          liked ? ' bg-purple-400' : 'bg-gray-300'
        }`}
        onClick={toggleLike}
      >
        <motion.div
          className={`${
            liked ? 'text-white' : 'text-gray-700'
          } font-semibold text-lg transform transition-transform`}
          initial={false}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {liked ? <PiHandsClappingFill /> : <PiHandsClapping />}
        </motion.div>
      </button>
      <div className="ml-2 pl-5 text-xl">{likes} {likes === 1 ? 'clap' : 'claps'}</div>
    </div>
  );
};

LikeButton.propTypes = {
  initialLikes: PropTypes.number.isRequired,
};

export default LikeButton;
