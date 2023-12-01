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


(ns aoc.2015.4
  (:use [clojure.string :only [trim]])
  (:import java.math.BigInteger
           java.security.MessageDigest))


(defn md5 [s]
  (let [algorithm (MessageDigest/getInstance "MD5")
        raw (.digest algorithm (.getBytes s))]
    (format "%032x" (BigInteger. 1 raw))))

(defn correct-secret-key? [s n zero-amount]
  (->> (format "%s%s" s n)
       md5
       (take zero-amount)
       (every? #(= % \0))))

(defn main []
  (let [input (trim (slurp "resource/2015/input4"))
        result1 (-> (take-while #(not (correct-secret-key? input % 5)) (range))
                    count)
        result2 (-> (take-while #(not (correct-secret-key? input % 6)) (range))
                    count)]
    (printf "Part 1: %s%nPart 2: %s%n" result1 result2)
    (flush)
    [result1 result2]))
