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


(ns aoc.2015.2
  (:use [clojure.string :only [split]]
        [clojure.java.io :only [reader]]))


(defn main []
  (let [[result1 result2 :as results]
        (with-open [rdr (reader "resource/2015/input2")]
          (->> (line-seq rdr)
               (map (fn [s]
                      (->> (split s #"x")
                           (map #(Integer/parseInt %))
                           (sort <)
                           ((fn [[a b c]]
                              [(+ (* 2 (+ (* a b) (* b c) (* c a)))
                                  (* a b))
                               (+ (* 2 (+ a b)) (* a b c))])))))
               (reduce (fn [[result1 result2] [size1 size2]]
                         [(+ result1 size1) (+ result2 size2)]))))]
    (printf "Part 1: %s%nPart 2: %s%n"
            result1
            result2)
    (flush)
    results))
