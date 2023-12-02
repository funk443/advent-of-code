;;;; Copyright (C) 2023  CToID <funk443@yandex.com>
;;;; 
;;;; This program is free software: you can redistribute it and/or modify it
;;;; under the terms of the GNU General Public License as published by the Free
;;;; Software Foundation, either version 3 of the License, or
;;;; (at your option) any later version.
;;;; 
;;;; This program is distributed in the hope that it will be useful, but WITHOUT
;;;; ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
;;;; FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
;;;; more details.
;;;; 
;;;; You should have received a copy of the GNU General Public License along
;;;; with this program.  If not, see <https://www.gnu.org/licenses/>.


(ns aoc.2023.2
  (:require [clojure.string :as s])
  (:use [clojure.java.io :only [reader]]))


(defn main []
  (with-open [rdr (reader "resource/2023/input2")]
    (let [input
          (line-seq rdr)
          box1
          {:red 12 :green 13 :blue 14}
          regex-game-id
          (re-pattern #"Game (\d+)")
          regex-colours
          (re-pattern #"(\d+) ([a-z]+),{0,1}")
          parse-game
          (fn [game]
            (->> (re-seq regex-colours game)
                 (mapv #(vector (-> (get % 2) keyword)
                                (-> (get % 1) parse-long)))
                 (vector (-> (re-find regex-game-id game)
                             second
                             parse-long))))
          games
          (mapv parse-game input)
          result1
          (reduce (fn [acc [game-id colours]]
                    (if (every? #(<= (get % 1) ((get % 0) box1)) colours)
                      (+ acc game-id)
                      acc))
                  0
                  games)
          result2
          (reduce (fn [acc [_ colours]]
                    (->> (reduce (fn [max-colours [colour-name colour-amount]]
                                   (update max-colours
                                           colour-name
                                           #(max % colour-amount)))
                                 {:red 0 :blue 0 :green 0}
                                 colours)
                         (reduce #(* %1 (val %2)) 1)
                         (+ acc)))
                  0
                  games)]
      (printf "Part 1: %s%nPart 2: %s%n"
              result1
              result2)
      [result1 result2])))
